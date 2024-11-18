import {
    Field,
    Label,
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    Textarea,
} from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { useForm } from '@inertiajs/react';
import clsx from 'clsx';
import { useState } from 'react';

export type Priorities = 'low' | 'medium' | 'high';
export default function TodoForm() {
    const [priority, setPriority] = useState<Priorities>('low');
    const { data, setData, post, reset } = useForm({
        title: '',
        description: '',
        priority: 'low',
    });
    const priorities: Priorities[] = ['low', 'medium', 'high'];
    const submit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        post(route('todos.store'), { onSuccess: () => reset() });
    };

    return (
        <form onSubmit={submit} className={'bg-blue flex flex-col gap-4 py-4 text-black w-full'}>
            <div
                className={
                    'flex flex-row flex-wrap items-center justify-center gap-6'
                }
            >
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <Field className={'flex flex-col gap-2 md:flex-row'}>
                    <Label className="self-center text-sm/6 font-medium">
                        Title:
                    </Label>
                    <Textarea
                        onChange={(e) => setData('title', e.target.value)}
                        value={data.title}
                        className={clsx(
                            'mt-3 block w-full resize-none rounded-lg border-2 border-none border-black bg-gray-700/40 px-3 py-1.5 text-sm/6 text-black',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25',
                        )}
                        rows={1}
                    />
                </Field>
                <Field className={'flex flex-col gap-2 md:flex-row'}>
                    <Label className="self-center text-sm/6 font-medium">
                        Description:
                    </Label>
                    <Textarea
                        onChange={(e) => setData('description', e.target.value)}
                        value={data.description}
                        className={clsx(
                            'mt-3 block max-h-10 w-full resize-none rounded-lg border-2 border-none border-black bg-gray-700/40 px-3 py-1.5 text-sm/6 text-black',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25',
                        )}
                        rows={2}
                    />
                </Field>
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <Listbox
                    value={priority}
                    onChange={(e) => {
                        setPriority(e);
                        setData('priority', e);
                    }}
                    as={'div'}
                    className={
                        'flex flex-col content-center items-center justify-center gap-4 md:flex-row'
                    }
                >
                    <Label className="self-center text-sm/6 font-medium">
                        Priority:
                    </Label>
                    <ListboxButton
                        className={clsx(
                            'h-10 mt-3 w-40 rounded-lg bg-gray-700/40 pl-3 pr-8 text-left text-sm/6 text-black',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                        )}
                    >
                        {priority}
                        <ChevronDownIcon
                            className="group pointer-events-none absolute right-2.5 top-2.5 size-4 fill-black/40 text-black"
                            aria-hidden="true"
                        />
                    </ListboxButton>
                    <ListboxOptions
                        anchor="bottom start"
                        transition
                        className={clsx(
                            'max-h-24 w-[var(--button-width)] rounded-xl border border-white/5 bg-gray-900 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
                            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
                        )}
                    >
                        {priorities.map((priorityValue) => (
                            <ListboxOption
                                key={priorityValue}
                                value={priorityValue}
                                className="data-[focus]:white/10 group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5"
                            >
                                {/*{priority === priorityValue && (*/}
                                <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                                {/*)}*/}
                                <div className="text-sm/6 text-white">
                                    {priorityValue}
                                </div>
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </Listbox>
            </div>
            <button className={'h-10 w-24 mx-auto mt-4 rounded-md bg-black text-gray-100'}>
                Submit
            </button>
        </form>
    );
}
