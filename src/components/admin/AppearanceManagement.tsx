
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, Upload, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AppearanceManagementProps {
  userRole: string;
}

export const AppearanceManagement = ({ userRole }: AppearanceManagementProps) => {
  const [appearanceData, setAppearanceData] = useState({
    primaryColor: '#3b82f6',
    companyName: 'Minha Empresa',
    favicon: null as File | null,
    faviconPreview: '',
    customDomain: 'suporte.minhaempresa.com',
    subdomain: 'minhaempresa'
  });
  const { toast } = useToast();

  const handleFaviconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) { // 1MB limit
        toast({
          title: "Erro",
          description: "O favicon deve ter no máximo 1MB",
          variant: "destructive"
        });
        return;
      }

      // Verificar se é uma imagem
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Erro",
          description: "Por favor, selecione um arquivo de imagem",
          variant: "destructive"
        });
        return;
      }

      setAppearanceData(prev => ({ ...prev, favicon: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAppearanceData(prev => ({ ...prev, faviconPreview: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!appearanceData.companyName.trim()) {
      toast({
        title: "Erro",
        description: "Nome da empresa é obrigatório",
        variant: "destructive"
      });
      return;
    }

    // Simular salvamento
    console.log('Saving appearance data:', appearanceData);
    
    toast({
      title: "Sucesso",
      description: "Configurações de aparência salvas com sucesso"
    });
  };

  const colorPresets = [
    '#3b82f6', // Blue
    '#ef4444', // Red
    '#10b981', // Green
    '#f59e0b', // Yellow
    '#8b5cf6', // Purple
    '#ec4899', // Pink
    '#06b6d4', // Cyan
    '#84cc16', // Lime
    '#f97316', // Orange
    '#6366f1'  // Indigo
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Eye className="h-6 w-6 text-slate-600 dark:text-slate-400" />
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6]">
              Personalização Visual
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Configure cores, favicon e outras personalizações visuais
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configurações */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="companyName">Nome da Empresa *</Label>
              <Input
                id="companyName"
                value={appearanceData.companyName}
                onChange={(e) => setAppearanceData(prev => ({ ...prev, companyName: e.target.value }))}
                placeholder="Nome que aparecerá no cabeçalho"
              />
            </div>

            <div>
              <Label>Cor Principal da Marca</Label>
              <div className="space-y-3 mt-2">
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={appearanceData.primaryColor}
                    onChange={(e) => setAppearanceData(prev => ({ ...prev, primaryColor: e.target.value }))}
                    className="w-12 h-10 border border-slate-300 rounded cursor-pointer"
                  />
                  <Input
                    value={appearanceData.primaryColor}
                    onChange={(e) => setAppearanceData(prev => ({ ...prev, primaryColor: e.target.value }))}
                    placeholder="#3b82f6"
                    className="font-mono"
                  />
                </div>
                
                {/* Color Presets */}
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Cores predefinidas:</p>
                  <div className="flex gap-2 flex-wrap">
                    {colorPresets.map(color => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded border-2 ${
                          appearanceData.primaryColor === color ? 'border-slate-400 scale-110' : 'border-slate-200'
                        } transition-all`}
                        style={{ backgroundColor: color }}
                        onClick={() => setAppearanceData(prev => ({ ...prev, primaryColor: color }))}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="favicon">Favicon</Label>
              <div className="mt-2">
                <input
                  id="favicon"
                  type="file"
                  accept="image/*"
                  onChange={handleFaviconUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('favicon')?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Carregar Favicon
                </Button>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Recomendado: 16x16 ou 32x32 pixels. Formatos: PNG, ICO, SVG
              </p>
            </div>

            <div>
              <Label htmlFor="subdomain">Subdomínio</Label>
              <div className="flex items-center">
                <Input
                  id="subdomain"
                  value={appearanceData.subdomain}
                  onChange={(e) => setAppearanceData(prev => ({ ...prev, subdomain: e.target.value.toLowerCase() }))}
                  placeholder="minhaempresa"
                  className="rounded-r-none"
                />
                <span className="bg-slate-100 dark:bg-slate-700 border border-l-0 px-3 py-2 rounded-r-md text-sm text-slate-600 dark:text-slate-400">
                  .coredesk.com
                </span>
              </div>
            </div>

            <div>
              <Label htmlFor="customDomainApp">Domínio Personalizado</Label>
              <Input
                id="customDomainApp"
                value={appearanceData.customDomain}
                onChange={(e) => setAppearanceData(prev => ({ ...prev, customDomain: e.target.value }))}
                placeholder="suporte.minhaempresa.com"
              />
              <p className="text-sm text-slate-500 mt-1">
                Configure um CNAME para usar seu próprio domínio
              </p>
            </div>

            <Button onClick={handleSave} className="w-full">
              Salvar Configurações de Aparência
            </Button>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Eye className="h-5 w-5 text-slate-600" />
              <h4 className="font-medium text-slate-900 dark:text-[#F6F6F6]">Prévia Visual</h4>
            </div>

            {/* Header Preview */}
            <Card className="p-0 overflow-hidden">
              <div 
                className="p-4 text-white"
                style={{ backgroundColor: appearanceData.primaryColor }}
              >
                <div className="flex items-center space-x-3">
                  {appearanceData.faviconPreview ? (
                    <img 
                      src={appearanceData.faviconPreview} 
                      alt="Favicon preview" 
                      className="h-8 w-8 object-contain bg-white rounded p-1"
                    />
                  ) : (
                    <div className="h-8 w-8 bg-white bg-opacity-20 rounded flex items-center justify-center">
                      <Palette className="h-4 w-4" />
                    </div>
                  )}
                  <h3 className="font-semibold text-lg">
                    {appearanceData.companyName || 'Nome da Empresa'}
                  </h3>
                </div>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Prévia do cabeçalho com a cor principal aplicada
                </p>
              </div>
            </Card>

            {/* Color Showcase */}
            <Card className="p-4">
              <h5 className="font-medium mb-3">Aplicação da Cor Principal:</h5>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: appearanceData.primaryColor }}
                  ></div>
                  <span className="text-sm">Botões primários</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded border-2"
                    style={{ borderColor: appearanceData.primaryColor }}
                  ></div>
                  <span className="text-sm">Links e destaques</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: appearanceData.primaryColor + '20' }}
                  ></div>
                  <span className="text-sm">Fundos de notificações</span>
                </div>
              </div>
            </Card>

            {/* Browser Tab Preview */}
            <Card className="p-4">
              <h5 className="font-medium mb-3">Prévia da Aba do Navegador:</h5>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded flex items-center space-x-2">
                {appearanceData.faviconPreview ? (
                  <img 
                    src={appearanceData.faviconPreview} 
                    alt="Favicon" 
                    className="h-4 w-4 object-contain"
                  />
                ) : (
                  <div className="h-4 w-4 bg-slate-300 rounded"></div>
                )}
                <span className="text-sm">
                  {appearanceData.companyName || 'Nome da Empresa'} - CoreDesk
                </span>
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
};
