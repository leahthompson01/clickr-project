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
            <div className={'mt-8 flex items-center justify-center gap-4'}>
                {todosList.map((el) => (
                    <div
                        className={
                            'flex h-40 w-80 flex-col gap-4 overflow-y-auto rounded-md bg-gray-700/10 p-4'
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
