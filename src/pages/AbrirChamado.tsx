
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  X, 
  Send,
  ArrowLeft,
  FileText,
  AlertCircle
} from 'lucide-react';

const AbrirChamado = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [visibilidade, setVisibilidade] = useState('publico');
  const [anexos, setAnexos] = useState<File[]>([]);

  // Verificar se o usuário está logado como cliente
  const customerData = localStorage.getItem('coredesk_customer');
  
  if (!customerData) {
    window.location.href = '/customer-login';
    return null;
  }

  const customer = JSON.parse(customerData);

  // Verificar se há categoria pré-selecionada na URL
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoriaParam = urlParams.get('categoria');
    if (categoriaParam) {
      setCategoria(categoriaParam);
    }
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAnexos(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setAnexos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!titulo.trim() || !descricao.trim() || !categoria || !prioridade) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    // Simular envio do chamado
    const novoTicket = {
      titulo,
      descricao,
      categoria,
      prioridade,
      visibilidade,
      anexos: anexos.map(file => file.name),
      cliente: customer.username,
      dataAbertura: new Date().toISOString()
    };

    console.log('Novo chamado criado:', novoTicket);
    
    // Redirecionar para meus chamados
    alert('Chamado criado com sucesso!');
    window.location.href = '/meus-chamados';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => window.history.back()}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                Abrir Novo Chamado
              </h1>
              <p className="text-slate-600">
                Descreva seu problema ou solicitação com o máximo de detalhes possível
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Formulário Principal */}
              <div className="lg:col-span-2 space-y-6">
                {/* Informações Básicas */}
                <Card>
                  <CardHeader>
                    <CardTitle>Informações do Chamado</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Título <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="Descreva brevemente o problema..."
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Descrição Detalhada <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        placeholder="Descreva o problema com o máximo de detalhes possível. Inclua passos para reproduzir, mensagens de erro, quando acontece, etc."
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        rows={8}
                        required
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Quanto mais detalhes você fornecer, mais rápido poderemos ajudar
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Anexos */}
                <Card>
                  <CardHeader>
                    <CardTitle>Anexos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600 mb-2">
                        Arraste arquivos aqui ou clique para selecionar
                      </p>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.txt"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        Selecionar Arquivos
                      </Button>
                      <p className="text-xs text-slate-500 mt-2">
                        Formatos aceitos: JPG, PNG, PDF, DOC, TXT (máx. 10MB cada)
                      </p>
                    </div>

                    {anexos.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {anexos.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-slate-400" />
                              <span className="text-sm text-slate-700">{file.name}</span>
                              <span className="text-xs text-slate-500">
                                ({(file.size / 1024 / 1024).toFixed(2)} MB)
                              </span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar com Configurações */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Categoria <span className="text-red-500">*</span>
                      </label>
                      <Select value={categoria} onValueChange={setCategoria} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="suporte">Suporte Técnico</SelectItem>
                          <SelectItem value="desenvolvimento">Desenvolvimento</SelectItem>
                          <SelectItem value="infraestrutura">Infraestrutura</SelectItem>
                          <SelectItem value="outros">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Prioridade <span className="text-red-500">*</span>
                      </label>
                      <Select value={prioridade} onValueChange={setPrioridade} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a prioridade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="baixa">Baixa</SelectItem>
                          <SelectItem value="media">Média</SelectItem>
                          <SelectItem value="alta">Alta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Visibilidade
                      </label>
                      <Select value={visibilidade} onValueChange={setVisibilidade}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a visibilidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="publico">Público</SelectItem>
                          <SelectItem value="privado">Privado</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-slate-500 mt-1">
                        Público: visível para outros usuários. Privado: apenas você e operadores.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-slate-900 mb-1">
                          Dica Importante
                        </h4>
                        <p className="text-xs text-slate-600">
                          Para acelerar o atendimento, forneça o máximo de informações possível: 
                          mensagens de erro, passos que levaram ao problema, capturas de tela, etc.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-2">
                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Chamado
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.history.back()}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AbrirChamado;
