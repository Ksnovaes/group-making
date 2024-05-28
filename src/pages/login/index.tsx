import { Container, Form } from "@/styles/pages/login";
import { Button, Text, TextInput } from "@ignite-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface FormInput {
    email: string;
    password: string;
}

export const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInput>();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: FormInput) => {
        setError(null);

        try {
            const res = await fetch('http://localhost:3001/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'An error occurred!');
            }

            const { token } = await res.json();
            localStorage.setItem('token', token);
            router.push('/home'); 
        } catch (error: any) {
            setError(error.message || 'Network error');
        }
    };

    return (
        <Container>
            <h1>FAÇA SEU LOGIN</h1>
            <Form as="form" onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <Text size="xl">Email</Text>
                    <TextInput 
                        {...register('email', { required: 'Email obrigatório' })}
                        type="email"
                        placeholder="seu-email@example.com"
                    />
                    {errors.email && <p style={{ fontSize: '8px', color: '#f75a68' }}>{errors.email.message}</p>}
                </label>

                <label>
                    <Text size="xl">Senha</Text>
                    <TextInput 
                        {...register('password', { required: 'Senha obrigatória' })}
                        type="password"
                        placeholder="*******" 
                    />
                    {errors.password && <p style={{ fontSize: '8px', color: '#f75a68' }}>{errors.password.message}</p>}
                </label>

                <Button type="submit">Entrar</Button>
                <Text>
                    Não possui uma conta? <a href="/signup" style={{ textDecoration: 'none', color: '#ffad5c' }}>Registre-se</a>
                </Text>
            </Form>
            {error && <p style={{ color: '#f75a68' }}>{error}</p>}
        </Container>
    );
};

export default Login;
