import { Container, Form, Select } from "@/styles/pages/signup";
import { Button, Text, TextInput } from "@ignite-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormInput {
    name: string;
    middleName: string;
    nickname: string;
    gender: string;
    email: string;
    password: string;
}

export const SignUp: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInput>();
    const router = useRouter();
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const onSubmit: SubmitHandler<FormInput> = async data => {
        setError('');
        setSuccess('');

        try {
            const res = await fetch('http://localhost:3001/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'An error occurred!');
            }

            setSuccess('User created successfully!');
            const result = await res.json();
            localStorage.setItem('token', result.token);
            router.push('/home');
        } catch (error: any) {
            setError(error.message || 'Network error.');
        }
    };

    return (
        <Container>
            <h1>FAÇA SEU REGISTRO</h1>
            <Form as="form" onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <Text size="xl">Nome</Text>
                    <TextInput 
                        {...register('name', { required: 'Nome é obrigatório'})}
                        placeholder="Seu nome"
                    />
                    {errors.name && <p style={{ fontSize: '8px', color: '#f75a68' }}>{errors.name.message}</p>}
                </label>

                <label>
                    <Text size="xl">Sobrenome</Text>
                    <TextInput 
                        {...register('middleName', { required: 'Sobrenome é obrigatório'})}
                        placeholder="Seu sobrenome"
                    />
                    {errors.middleName && <p style={{ fontSize: '8px', color: '#f75a68' }}>{errors.middleName.message}</p>}
                </label>

                <label>
                    <Text size="xl">Nickname</Text>
                    <TextInput 
                        {...register('nickname')}
                        placeholder="Seu nickname"
                    />
                    {errors.middleName && <p style={{ fontSize: '8px', color: '#f75a68' }}>{errors.middleName.message}</p>}
                </label> 

                <label>
                    <Text size="xl">Seu gênero</Text>
                    <Select {...register('gender', { required: 'Gênero é obrigatório' })}>
                        <option value="">.</option>
                        <option value="Male">Masculino</option>
                        <option value="Female">Feminino</option>
                    </Select>
                    {errors.gender && <p style={{ fontSize: '8px', color: '#f75a68' }}>{errors.gender.message}</p>}
                </label>
                
                <label>
                    <Text size="xl">Email</Text>
                    <TextInput 
                        {...register('email', { required: 'Email é obrigatório' })}
                        type="email"
                        placeholder="Seu nickname"
                    />
                    {errors.email && <p style={{ fontSize: '8px', color: '#f75a68' }}>{errors.email.message}</p>}
                </label> 

                <label>
                    <Text size="xl">Password</Text>
                    <TextInput 
                        {...register('password', { required: 'Senha é obrigatório' })}
                        type="password"
                        placeholder="Seu nickname"
                    />
                    {errors.password && <p style={{ fontSize: '8px', color: '#f75a68' }}>{errors.password.message}</p>}
                </label>
                <Button type="submit">Registrar</Button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>} 
            </Form>
        </Container>
        
    )
}

export default SignUp;