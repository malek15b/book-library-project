type ActionsProps = {
    edit: () => void
    delete: () => void
    details: () => void
}

export default function Actions(props: ActionsProps) {
    return (
        <>
            {props.details &&
            <button title="anzeigen" onClick={props.details} className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100
                text-gray-600">
                <svg className="w-6 h-6 text-sky-500 dark:text-white" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2"
                          d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                    <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                </svg>
            </button>
            }
            <button title="bearbeiten" onClick={props.edit} className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100
                text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M15.232 5.232l3.536 3.536M4 20h4.586a1 1 0 0 0 .707-.293L19.414 9.586a2 2 0 0 0 0-2.828l-2.172-2.172a2 2 0 0 0-2.828 0L4.293 14.293A1 1 0 0 0 4 15V20z"/>
                </svg>
            </button>

            <button title="löschen" onClick={props.delete} className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-red-50
                text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 3h4a1 1 0 0 1 1 1v1H9V4a1 1 0 0 1 1-1z"/>
                </svg>
            </button>
        </>
    )
}