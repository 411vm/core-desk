
export interface TicketResponse {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  type: 'customer' | 'staff' | 'system';
  isPrivate: boolean;
}

export interface TicketDetail {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  assignee: string;
  requester: string;
  createdAt: string;
  responses: number;
  attachments: number;
  status: string;
  hasCustomerReply: boolean;
  updatedAt: string;
  sector: string;
}

export const mockTicketsData: Record<string, TicketDetail> = {
  '#2024-001': {
    id: '#2024-001',
    title: 'Problema com acesso ao email',
    description: 'Não consigo acessar minha conta de email desde ontem. Aparece uma mensagem de erro quando tento fazer login.',
    priority: 'high',
    category: 'Email',
    assignee: 'João Silva',
    requester: 'Maria Silva',
    createdAt: '2024-01-15 14:30',
    responses: 3,
    attachments: 1,
    status: 'Em Andamento',
    hasCustomerReply: true,
    updatedAt: '2024-01-15 16:30',
    sector: 'Suporte N1'
  },
  '#2024-002': {
    id: '#2024-002',
    title: 'Instalação do Adobe Reader',
    description: 'Preciso instalar o Adobe Reader para abrir documentos PDF. Tentei baixar do site oficial mas não consegui.',
    priority: 'medium',
    category: 'Software',
    assignee: '',
    requester: 'João Santos',
    createdAt: '2024-01-15 15:45',
    responses: 1,
    attachments: 0,
    status: 'Novo',
    hasCustomerReply: false,
    updatedAt: '2024-01-15 15:45',
    sector: 'Suporte N1'
  },
  '#2024-003': {
    id: '#2024-003',
    title: 'Computador travando constantemente',
    description: 'Meu computador está travando várias vezes ao dia, principalmente quando abro múltiplas aplicações.',
    priority: 'urgent',
    category: 'Hardware',
    assignee: 'Ana Costa',
    requester: 'Carlos Oliveira',
    createdAt: '2024-01-15 13:20',
    responses: 4,
    attachments: 2,
    status: 'Em Andamento',
    hasCustomerReply: true,
    updatedAt: '2024-01-15 17:10',
    sector: 'Suporte N2'
  },
  '#2024-004': {
    id: '#2024-004',
    title: 'Reset de senha do sistema',
    description: 'Esqueci a senha do sistema ERP e preciso resetar para acessar os relatórios mensais.',
    priority: 'medium',
    category: 'Acesso',
    assignee: 'Pedro Santos',
    requester: 'Paula Mendes',
    createdAt: '2024-01-14 09:15',
    responses: 2,
    attachments: 0,
    status: 'Aguardando',
    hasCustomerReply: false,
    updatedAt: '2024-01-15 11:30',
    sector: 'Suporte N1'
  },
  '#2024-005': {
    id: '#2024-005',
    title: 'Configuração de impressora',
    description: 'Nova impressora não está sendo reconhecida pelo sistema. Já tentei instalar os drivers.',
    priority: 'low',
    category: 'Hardware',
    assignee: 'Roberto Lima',
    requester: 'Sandra Costa',
    createdAt: '2024-01-13 16:00',
    responses: 5,
    attachments: 1,
    status: 'Resolvido',
    hasCustomerReply: false,
    updatedAt: '2024-01-15 10:45',
    sector: 'Infraestrutura'
  },
  '#2024-006': {
    id: '#2024-006',
    title: 'Erro na impressora da sala 203',
    description: 'A impressora está apresentando erro de papel emperrado constantemente.',
    priority: 'medium',
    category: 'Hardware',
    assignee: 'Operador Atual',
    requester: 'Roberto Lima',
    createdAt: '2024-01-15 16:00',
    responses: 2,
    attachments: 0,
    status: 'Em Andamento',
    hasCustomerReply: true,
    updatedAt: '2024-01-15 16:30',
    sector: 'Suporte N1'
  },
  '#2024-007': {
    id: '#2024-007',
    title: 'Solicitação de acesso ao sistema financeiro',
    description: 'Preciso de acesso para gerar relatórios mensais do departamento financeiro.',
    priority: 'high',
    category: 'Acesso',
    assignee: '',
    requester: 'Sandra Costa',
    createdAt: '2024-01-15 16:45',
    responses: 0,
    attachments: 1,
    status: 'Novo',
    hasCustomerReply: false,
    updatedAt: '2024-01-15 17:00',
    sector: 'Suporte N1'
  }
};

export const mockResponsesData: Record<string, TicketResponse[]> = {
  '#2024-001': [
    {
      id: '1',
      author: 'Maria Silva',
      content: 'Não consigo acessar minha conta de email desde ontem. Aparece uma mensagem de erro quando tento fazer login.',
      timestamp: '2024-01-15 14:30',
      type: 'customer',
      isPrivate: false
    },
    {
      id: '2',
      author: 'João Silva',
      content: 'Olá Maria, vou verificar sua conta de email. Pode me informar qual é a mensagem de erro exata que aparece?',
      timestamp: '2024-01-15 15:00',
      type: 'staff',
      isPrivate: false
    },
    {
      id: '3',
      author: 'Sistema',
      content: 'Chamado atribuído ao setor Suporte N1',
      timestamp: '2024-01-15 15:01',
      type: 'system',
      isPrivate: false
    },
    {
      id: '4',
      author: 'Maria Silva',
      content: 'A mensagem é: "Erro de autenticação. Verifique suas credenciais."',
      timestamp: '2024-01-15 16:30',
      type: 'customer',
      isPrivate: false
    }
  ],
  '#2024-002': [
    {
      id: '1',
      author: 'João Santos',
      content: 'Preciso instalar o Adobe Reader para abrir documentos PDF. Tentei baixar do site oficial mas não consegui.',
      timestamp: '2024-01-15 15:45',
      type: 'customer',
      isPrivate: false
    },
    {
      id: '2',
      author: 'Sistema',
      content: 'Chamado criado e aguardando atribuição',
      timestamp: '2024-01-15 15:45',
      type: 'system',
      isPrivate: false
    }
  ],
  '#2024-003': [
    {
      id: '1',
      author: 'Carlos Oliveira',
      content: 'Meu computador está travando várias vezes ao dia, principalmente quando abro múltiplas aplicações.',
      timestamp: '2024-01-15 13:20',
      type: 'customer',
      isPrivate: false
    },
    {
      id: '2',
      author: 'Ana Costa',
      content: 'Vou verificar a configuração do seu sistema. Pode me informar qual versão do Windows você está usando?',
      timestamp: '2024-01-15 14:00',
      type: 'staff',
      isPrivate: false
    },
    {
      id: '3',
      author: 'Carlos Oliveira',
      content: 'Windows 11 Pro, versão mais recente.',
      timestamp: '2024-01-15 16:45',
      type: 'customer',
      isPrivate: false
    },
    {
      id: '4',
      author: 'Ana Costa',
      content: 'Vou fazer uma verificação remota para analisar o desempenho.',
      timestamp: '2024-01-15 17:10',
      type: 'staff',
      isPrivate: false
    }
  ],
  '#2024-004': [
    {
      id: '1',
      author: 'Paula Mendes',
      content: 'Esqueci a senha do sistema ERP e preciso resetar para acessar os relatórios mensais.',
      timestamp: '2024-01-14 09:15',
      type: 'customer',
      isPrivate: false
    },
    {
      id: '2',
      author: 'Pedro Santos',
      content: 'Vou resetar sua senha. Aguarde algumas horas para que as alterações sejam aplicadas.',
      timestamp: '2024-01-15 11:30',
      type: 'staff',
      isPrivate: false
    }
  ],
  '#2024-005': [
    {
      id: '1',
      author: 'Sandra Costa',
      content: 'Nova impressora não está sendo reconhecida pelo sistema. Já tentei instalar os drivers.',
      timestamp: '2024-01-13 16:00',
      type: 'customer',
      isPrivate: false
    },
    {
      id: '2',
      author: 'Roberto Lima',
      content: 'Vou verificar a configuração da rede e os drivers necessários.',
      timestamp: '2024-01-14 09:00',
      type: 'staff',
      isPrivate: false
    },
    {
      id: '3',
      author: 'Sandra Costa',
      content: 'Ok, aguardo retorno.',
      timestamp: '2024-01-14 09:30',
      type: 'customer',
      isPrivate: false
    },
    {
      id: '4',
      author: 'Roberto Lima',
      content: 'Problema resolvido. Configurei a impressora na rede corretamente.',
      timestamp: '2024-01-15 10:30',
      type: 'staff',
      isPrivate: false
    },
    {
      id: '5',
      author: 'Sandra Costa',
      content: 'Perfeito! Agora está funcionando. Obrigada!',
      timestamp: '2024-01-15 10:45',
      type: 'customer',
      isPrivate: false
    }
  ],
  '#2024-006': [
    {
      id: '1',
      author: 'Roberto Lima',
      content: 'A impressora está apresentando erro de papel emperrado constantemente.',
      timestamp: '2024-01-15 16:00',
      type: 'customer',
      isPrivate: false
    },
    {
      id: '2',
      author: 'Operador Atual',
      content: 'Vou verificar o mecanismo de alimentação de papel da impressora.',
      timestamp: '2024-01-15 16:15',
      type: 'staff',
      isPrivate: false
    },
    {
      id: '3',
      author: 'Roberto Lima',
      content: 'O problema continua mesmo depois de limpar o caminho do papel.',
      timestamp: '2024-01-15 16:30',
      type: 'customer',
      isPrivate: false
    }
  ],
  '#2024-007': [
    {
      id: '1',
      author: 'Sandra Costa',
      content: 'Preciso de acesso para gerar relatórios mensais do departamento financeiro.',
      timestamp: '2024-01-15 16:45',
      type: 'customer',
      isPrivate: false
    }
  ]
};

export const getTicketById = (id: string): TicketDetail | null => {
  return mockTicketsData[id] || null;
};

export const getTicketResponses = (id: string): TicketResponse[] => {
  return mockResponsesData[id] || [];
};
