
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Palette, Upload, Eye, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BrandManagementProps {
  userRole: string;
}

export const BrandManagement = ({ userRole }: BrandManagementProps) => {
  const [brandData, setBrandData] = useState({
    brandName: 'CoreDesk Support',
    subdomain: 'acme',
    logo: null as File | null,
    logoPreview: '',
    agentSignature: 'Atenciosamente,\nEquipe de Suporte CoreDesk',
    customDomain: 'suporte.minhaempresa.com'
  });
  const { toast } = useToast();

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast({
          title: "Erro",
          description: "O arquivo deve ter no máximo 2MB",
          variant: "destructive"
        });
        return;
      }

      setBrandData(prev => ({ ...prev, logo: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setBrandData(prev => ({ ...prev, logoPreview: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!brandData.brandName.trim()) {
      toast({
        title: "Erro",
        description: "Nome da marca é obrigatório",
        variant: "destructive"
      });
      return;
    }

    if (!brandData.subdomain.trim()) {
      toast({
        title: "Erro",
        description: "Subdomínio é obrigatório",
        variant: "destructive"
      });
      return;
    }

    // Simular salvamento
    console.log('Saving brand data:', brandData);
    
    toast({
      title: "Sucesso",
      description: "Configurações de marca salvas com sucesso"
    });
  };

  const validateSubdomain = (subdomain: string) => {
    const regex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;
    return regex.test(subdomain) && subdomain.length >= 3 && subdomain.length <= 20;
  };

  const validateDomain = (domain: string) => {
    const regex = /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/;
    return regex.test(domain);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Palette className="h-6 w-6 text-slate-600 dark:text-slate-400" />
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6]">
              Gerenciamento da Marca
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Configure a identidade visual da sua plataforma
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formulário */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="brandName">Nome da Marca *</Label>
              <Input
                id="brandName"
                value={brandData.brandName}
                onChange={(e) => setBrandData(prev => ({ ...prev, brandName: e.target.value }))}
                placeholder="Ex: Acme Corp Helpdesk"
              />
            </div>

            <div>
              <Label htmlFor="subdomain">Subdomínio *</Label>
              <div className="flex items-center">
                <Input
                  id="subdomain"
                  value={brandData.subdomain}
                  onChange={(e) => setBrandData(prev => ({ ...prev, subdomain: e.target.value.toLowerCase() }))}
                  placeholder="acme"
                  className="rounded-r-none"
                />
                <span className="bg-slate-100 dark:bg-slate-700 border border-l-0 px-3 py-2 rounded-r-md text-sm text-slate-600 dark:text-slate-400">
                  .coredesk.com
                </span>
              </div>
              {brandData.subdomain && !validateSubdomain(brandData.subdomain) && (
                <p className="text-sm text-red-600 mt-1">
                  Subdomínio inválido (3-20 caracteres, apenas letras, números e hífen)
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="customDomain">Mapeamento de Host (Opcional)</Label>
              <Input
                id="customDomain"
                value={brandData.customDomain}
                onChange={(e) => setBrandData(prev => ({ ...prev, customDomain: e.target.value }))}
                placeholder="suporte.minhaempresa.com"
              />
              <p className="text-sm text-slate-500 mt-1">
                <Globe className="inline h-3 w-3 mr-1" />
                Configure um CNAME do seu domínio para apontar para o CoreDesk
              </p>
              {brandData.customDomain && !validateDomain(brandData.customDomain) && (
                <p className="text-sm text-red-600 mt-1">
                  Formato de domínio inválido
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="logo">Logotipo</Label>
              <div className="mt-2">
                <input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('logo')?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Carregar Logotipo
                </Button>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Formatos aceitos: PNG, JPG, SVG. Tamanho máximo: 2MB
              </p>
            </div>

            <div>
              <Label htmlFor="agentSignature">Assinatura do Agente</Label>
              <Textarea
                id="agentSignature"
                value={brandData.agentSignature}
                onChange={(e) => setBrandData(prev => ({ ...prev, agentSignature: e.target.value }))}
                placeholder="Texto que aparecerá nas assinaturas de e-mail..."
                rows={4}
              />
            </div>

            <Button onClick={handleSave} className="w-full">
              Salvar Configurações de Marca
            </Button>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Eye className="h-5 w-5 text-slate-600" />
              <h4 className="font-medium text-slate-900 dark:text-[#F6F6F6]">Prévia</h4>
            </div>

            {/* Logo Preview */}
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                {brandData.logoPreview ? (
                  <img 
                    src={brandData.logoPreview} 
                    alt="Logo preview" 
                    className="h-10 w-10 object-contain"
                  />
                ) : (
                  <div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center">
                    <Palette className="h-5 w-5 text-slate-400" />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-[#F6F6F6]">
                    {brandData.brandName || 'Nome da Marca'}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {brandData.subdomain || 'subdomain'}.coredesk.com
                  </p>
                </div>
              </div>
            </Card>

            {/* URL Preview */}
            <Card className="p-4">
              <h5 className="font-medium mb-2">URLs de Acesso:</h5>
              <div className="space-y-2 text-sm">
                <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded">
                  <strong>Subdomínio:</strong><br />
                  https://{brandData.subdomain || 'subdomain'}.coredesk.com
                </div>
                {brandData.customDomain && validateDomain(brandData.customDomain) && (
                  <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded">
                    <strong>Domínio Personalizado:</strong><br />
                    https://{brandData.customDomain}
                  </div>
                )}
              </div>
            </Card>

            {/* Signature Preview */}
            <Card className="p-4">
              <h5 className="font-medium mb-2">Prévia da Assinatura:</h5>
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded text-sm whitespace-pre-line">
                {brandData.agentSignature || 'Assinatura do agente aparecerá aqui...'}
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
};
