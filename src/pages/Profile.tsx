
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, User, Mail, Phone, Calendar, MapPin, Save } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userType, setUserType] = useState<'admin' | 'operator' | 'customer' | null>(null);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    role: '',
    joinDate: '',
    location: ''
  });

  useEffect(() => {
    // Verificar qual tipo de usuário está logado
    const customerData = localStorage.getItem('coredesk_customer');
    const operatorData = localStorage.getItem('coredesk_user');
    
    if (customerData) {
      const customer = JSON.parse(customerData);
      setUserType('customer');
      setUserData({
        name: customer.username || 'Cliente',
        email: customer.email || 'cliente@empresa.com',
        phone: '(11) 99999-9999',
        department: 'Cliente',
        role: 'Cliente',
        joinDate: '15/03/2023',
        location: 'São Paulo, SP'
      });
    } else if (operatorData) {
      const operator = JSON.parse(operatorData);
      if (operator.role === 'admin') {
        setUserType('admin');
        setUserData({
          name: operator.username || 'Administrador',
          email: 'admin@coredesk.com',
          phone: '(11) 99999-9999',
          department: 'Administração',
          role: 'Administrador',
          joinDate: '01/01/2023',
          location: 'São Paulo, SP'
        });
      } else {
        setUserType('operator');
        setUserData({
          name: operator.username || 'Operador',
          email: 'operador@coredesk.com',
          phone: '(11) 99999-9999',
          department: 'Suporte Técnico',
          role: operator.role === 'manager' ? 'Gestor' : 'Operador',
          joinDate: '15/03/2023',
          location: 'São Paulo, SP'
        });
      }
    } else {
      // Se não há usuário logado, redirecionar para login
      navigate('/');
    }
  }, [navigate]);

  const handleBack = () => {
    switch (userType) {
      case 'admin':
        navigate('/admin');
        break;
      case 'operator':
        navigate('/dashboard');
        break;
      case 'customer':
        navigate('/customer-dashboard');
        break;
      default:
        navigate('/');
    }
  };

  const handleSave = () => {
    // Aqui você salvaria os dados
    setIsEditing(false);
    console.log('Dados salvos:', userData);
  };

  if (!userType) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#2b2d31] flex items-center justify-center">
        <div className="text-slate-600 dark:text-slate-400">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#2b2d31]">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-[#F6F6F6]">
                Meu Perfil
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Gerencie suas informações pessoais
              </p>
            </div>
          </div>
          
          <Button onClick={isEditing ? handleSave : () => setIsEditing(true)}>
            <Save className="h-4 w-4 mr-2" />
            {isEditing ? 'Salvar' : 'Editar'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Picture and Basic Info */}
          <Card className="p-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-12 w-12 text-blue-600 dark:text-blue-300" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-[#F6F6F6] mb-2">
                {userData.name}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-1">{userData.role}</p>
              <p className="text-slate-500 dark:text-slate-500">{userData.department}</p>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                  <Calendar className="h-4 w-4" />
                  <span>Desde {userData.joinDate}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                  <MapPin className="h-4 w-4" />
                  <span>{userData.location}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6] mb-4">
                Informações Pessoais
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    value={userData.name}
                    onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      id="phone"
                      value={userData.phone}
                      onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="location">Localização</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      id="location"
                      value={userData.location}
                      onChange={(e) => setUserData(prev => ({ ...prev, location: e.target.value }))}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Professional Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6] mb-4">
                Informações Profissionais
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Departamento</Label>
                  <Input
                    id="department"
                    value={userData.department}
                    disabled
                    className="mt-1 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                
                <div>
                  <Label htmlFor="role">Cargo</Label>
                  <Input
                    id="role"
                    value={userData.role}
                    disabled
                    className="mt-1 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                
                <div>
                  <Label htmlFor="joinDate">Data de admissão</Label>
                  <Input
                    id="joinDate"
                    value={userData.joinDate}
                    disabled
                    className="mt-1 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
