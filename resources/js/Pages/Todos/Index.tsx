import TodoForm, { Priorities } from '@/Components/TodoForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

type Todo = {
    title: string;
    description: string;
    priority: Priorities;
    completed: boolean;
    id: number;
};

type Props = {
    todosList: Todo[];
};
export default function Index({ todosList }: Props) {
    const priorityHash = {
        low: 1,
        medium: 2,
        high: 3,
    };
    //first sort todos based on priority
    todosList.sort(
        (a, b) => priorityHash[b.priority] - priorityHash[a.priority],
    );
    return (
        <AuthenticatedLayout>
            <Head title={'todos'} />
            <TodoForm />
            <div
                className={
                    'mt-2 flex h-[calc(100vh-350px)] w-[100vw-200px] flex-wrap items-center justify-center gap-4 overflow-y-auto sm:flex-col md:mx-auto md:mt-8 md:h-[calc(100vh-300px)] md:flex-row lg:h-[calc(100vh-300px)] lg:max-w-5xl'
                }
            >
                {todosList.map((el) => (
                    <div
                        className={
                            'flex h-48 min-w-60 max-w-80 flex-col gap-4 overflow-y-auto rounded-md bg-gray-700/10 p-4'
                        }
                        key={el.id}
                    >
                        <h1>Title: {el.title}</h1>
                        <p>Description: {el.description}</p>
                        <span>Priority: {el.priority}</span>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
