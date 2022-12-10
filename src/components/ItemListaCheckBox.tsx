type ItemListaCheckBoxProps = {
    describe: string,
    onChange: () => void;
    check: boolean;
    defaultCheck: boolean;
    schemaColor: boolean;
}

export default function ItemListaCheckBox(props: ItemListaCheckBoxProps) {
    return (
        <tr className={props.schemaColor ? "bg-gray-50" : ""}>
            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
            <div className="form-check">
                <input defaultChecked={props.defaultCheck} onChange={props.onChange} className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="isDigrafo" />
            </div>
            </td>
            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                {props.describe}
            </td>
        </tr>
    )
}