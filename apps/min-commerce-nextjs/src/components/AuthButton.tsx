"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import styled from 'styled-components';
import Link from 'next/link';
import React, { useState } from 'react';

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
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 15px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UserName = styled.p`
  margin: 0;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const SignOutButton = styled.button`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
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
          <Link href="/account" style={{ textDecoration: 'none', color: 'inherit' }}>Mi cuenta</Link>
          <Link href="/orders" style={{ textDecoration: 'none', color: 'inherit' }}>Mis pedidos</Link>
          <SignOutButton onClick={() => signOut()}>Cerrar sesión</SignOutButton>
        </UserMenuContainer>
      )}
    </AuthContainer>
  );
}
