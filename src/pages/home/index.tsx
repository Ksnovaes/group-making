import { Container, Form, GroupList } from "@/styles/pages/homepage";
import { TextInput, Text, Button, Box } from "@ignite-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormInput {
    title: string;
    description: string;
}

interface Group {
    _id: string;
    title: string;
    description: string;
    user: {
        _id: string;
        name: string;
        email: string;
    };
}

export const Home: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInput>();
    const router = useRouter();
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {
        const fetchGroups = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                const res = await fetch('http://localhost:3001/group/groups', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || 'An error occurred!');
                }

                const data = await res.json();
                setGroups(data);
            } catch (error: any) {
                setError(error.message || 'An error occurred while fetching groups.');
                console.error('Error fetching groups: ', error);
            }
        }
        fetchGroups();
    }, [router]); 

    if (error) {
        return <div>Error: {error}</div>
    }


    const onSubmit: SubmitHandler<FormInput> = async (data) => {
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const res = await fetch('http://localhost:3001/group/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'An error occurred!');
            }

            const newGroup = await res.json();
            setSuccess('Group created successfully!');
            setGroups([...groups, newGroup]);
        } catch (error: any) {
            setError(error.message || 'Network error.');
        }
    };

    return (
        <Container>
            <h1>CRIE SEU GRUPO</h1>
            <Form as="form" onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <Text size="xl">Título do grupo</Text>
                    <TextInput 
                        {...register('title', { required: 'É obrigatório ter um título' })}
                        type="text"
                        placeholder="Seu título"
                    />
                    {errors.title && <p style={{ fontSize: '8px', color: '#f75a68' }}>{errors.title.message}</p>}
                </label>

                <label>
                    <Text size="xl">Descrição do grupo</Text>
                    <TextInput 
                        {...register('description', { required: 'É obrigatório ter uma descrição' })}
                        type="text"
                        placeholder="Sua descrição"
                    />
                    {errors.description && <p style={{ fontSize: '8px', color: '#f75a68' }}>{errors.description.message}</p>}
                </label>

                <Button type="submit">Criar</Button>
            </Form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        <br/>
            <Box>
                <h2>Grupos existentes</h2>
                <GroupList>
                    {groups.map((group) => (
                        <li key={group._id}>
                            <h3>{group.title}</h3>
                            <p>{group.description}</p>
                            <p>Criado por: {group.user.name}</p>
                        </li>
                    ))}
                </GroupList>
            </Box>
        </Container>
    );
};

export default Home;
