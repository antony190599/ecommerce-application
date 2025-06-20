"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const UnauthorizedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #e11d48;
`;

const Message = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const RoleInfo = styled.div`
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 2rem;
  border-left: 4px solid #3b82f6;
`;

export default function UnauthorizedPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Obtener información del usuario actual
    const fetchUserRole = async () => {
      try {
        const response = await fetch("/api/auth/user");
        if (response.ok) {
          const userData = await response.json();
          setUserRole(userData.role || "usuario");
        }
      } catch (error) {
        console.error("Error al obtener el rol del usuario:", error);
        setUserRole("usuario");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  return (
    <UnauthorizedContainer>
      <Title>Acceso Denegado</Title>
      <Message>
        No tienes permisos suficientes para acceder a esta página. Por favor,
        inicia sesión con una cuenta que tenga los permisos necesarios o contacta
        a tu administrador si crees que esto es un error.
      </Message>

      {!isLoading && userRole && (
        <RoleInfo>
          <p>
            <strong>Tu rol actual:</strong> {userRole}
          </p>
          <p>
            Este rol no tiene los permisos necesarios para acceder al recurso
            solicitado.
          </p>
        </RoleInfo>
      )}

      <div className="flex gap-4">
        <Button onClick={() => router.push("/")}>Volver a Inicio</Button>
        <Button
          variant="outline"
          onClick={() => router.push("/auth/login")}
        >
          Iniciar sesión con otra cuenta
        </Button>
      </div>
    </UnauthorizedContainer>
  );
}
