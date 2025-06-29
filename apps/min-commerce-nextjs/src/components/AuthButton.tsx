"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import styled from 'styled-components';
import Link from 'next/link';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

// Estilos para que coincida con tu diseño
const AuthContainer = styled.div`
  position: relative;
`;

const AuthIconButton = styled.button`
  background-color: #F6F7FC;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    background-color: #E4E9F5;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const UserMenuContainer = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  width: 200px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: 15px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 10px;

  /* Triángulo pseudo-elemento */
  &:before {
    content: "";
    position: absolute;
    top: -10px;
    right: 20px; /* Ajusta este valor para alinear con el centro del botón */
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
  }
`;

const UserName = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const UserMenuLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
  text-align: left;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: color ${({ theme }) => theme.transitions.fast};
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SignOutButton = styled.button`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;

const AdminButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

export default function AuthButton() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleAdminView = () => {
    
    if (pathname.startsWith('/admin')) {
      router.push('/');
    } else {
      router.push('/admin');
    }
    setIsOpen(false);
  };

  const isAdminView = pathname.startsWith('/admin');

  console.log("Estado de admin:", session?.user?.isAdmin);

  return (
    <AuthContainer>
      <AuthIconButton onClick={session ? toggleMenu : () => signIn("google", { callbackUrl: "/" })} aria-label={session ? "Mi cuenta" : "Iniciar sesión"}>
        <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </AuthIconButton>

      {session && isOpen && (
        <UserMenuContainer>
          <UserName>Hola, {session.user?.name || 'Usuario'}</UserName>
          <UserMenuLink href="/account">Mi cuenta</UserMenuLink>
          <UserMenuLink href="/orders">Mis pedidos</UserMenuLink>

          {session.user?.isAdmin && (
            <AdminButton onClick={toggleAdminView}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                {isAdminView ? (
                  // Icono de tienda si está en vista de admin
                  <path d="M21.9 8.89l-1.05-4.37c-.22-.9-1-1.52-1.91-1.52H5.05c-.9 0-1.69.63-1.9 1.52L2.1 8.89c-.24.99.38 1.96 1.35 2.23.33.09.68.18.96.18h.1C5.32 12.58 6.87 14 9 14c2.12 0 3.68-1.41 4.48-2.69h.02c.8 1.28 2.36 2.69 4.48 2.69 2.13 0 3.68-1.41 4.48-2.69h.1c.28 0 .63-.09.96-.18.98-.27 1.6-1.24 1.36-2.24zM7.5 14c-.83 0-1.5-.67-1.5-1.5S6.67 11 7.5 11s1.5.67 1.5 1.5S8.33 14 7.5 14zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                ) : (
                  // Icono de dashboard si está en vista de tienda
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                )}
              </svg>
              <span>
                {isAdminView ? 'Ir a Tienda' : 'Ir a Admin'}
              </span>  
            </AdminButton>
          )}
          <SignOutButton onClick={() => signOut()}>Cerrar sesión</SignOutButton>
        </UserMenuContainer>
      )}
    </AuthContainer>
  );
}
