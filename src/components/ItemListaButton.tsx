type ItemListaButtonProps = {
    buttonName: string,
    describe: string,
    onClick: () => void;
    schemaColor: boolean;
}

export default function ItemListaButton(props: ItemListaButtonProps) {
    return (
        <tr className={props.schemaColor ? "bg-gray-50" : ""}>
            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                <button onClick={props.onClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                    {props.buttonName}
                </button>
            </td>
            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                {props.describe}
            </td>
        </tr>
    )
}