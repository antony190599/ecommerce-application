"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import styled from 'styled-components';
import Link from 'next/link';
import React from 'react';

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

export default function AuthButton() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AuthContainer>
      <AuthIconButton onClick={session ? toggleMenu : () => signIn("google")} aria-label={session ? "Mi cuenta" : "Iniciar sesión"}>
        <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </AuthIconButton>

      {session && isOpen && (
        <UserMenuContainer>
          <UserName>Hola, {session.user?.name || 'Usuario'}</UserName>
          <UserMenuLink href="/account">Mi cuenta</UserMenuLink>
          <UserMenuLink href="/orders">Mis pedidos</UserMenuLink>
          <SignOutButton onClick={() => signOut()}>Cerrar sesión</SignOutButton>
        </UserMenuContainer>
      )}
    </AuthContainer>
  );
}
