import { createContext, useContext, useState, ReactNode } from 'react';
import { Contract } from '@/data/mockContracts';
import { mockContracts } from '@/data/mockContracts';

interface ContractContextType {
  contracts: Contract[];
  addContract: (contract: Contract) => void;
  updateContract: (id: string, updates: Partial<Contract>) => void;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

export const useContracts = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error('useContracts must be used within a ContractProvider');
  }
  return context;
};

interface ContractProviderProps {
  children: ReactNode;
}

export const ContractProvider = ({ children }: ContractProviderProps) => {
  const [contracts, setContracts] = useState<Contract[]>(mockContracts);

  const addContract = (contract: Contract) => {
    setContracts(prev => [contract, ...prev]);
  };

  const updateContract = (id: string, updates: Partial<Contract>) => {
    setContracts(prev => 
      prev.map(contract => 
        contract.id === id ? { ...contract, ...updates } : contract
      )
    );
  };

  return (
    <ContractContext.Provider value={{ contracts, addContract, updateContract }}>
      {children}
    </ContractContext.Provider>
  );
};