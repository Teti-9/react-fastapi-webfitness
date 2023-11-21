import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table'
import '../styles/BasicTable.css'

function BasicTable({ data, columns, title_tabela }) {

    /** @type import('@tanstack/react-table').ColumnDef<any> */

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),

    })

    return (
        <div className='table-container'>
            <h1>{title_tabela}</h1>
            <table className='table'>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                >
                                    {header.isPlaceholder ? null : (
                                        <div>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='btn-utils'>
                <button onClick={() => table.setPageIndex(0)}>Primeira Página</button>
                <button
                    disabled={!table.getCanNextPage()}
                    onClick={() => table.nextPage()}
                >
                    Próxima Página
                </button>
                <button
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => table.previousPage()}
                >
                    Página Anterior
                </button>
                <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                    Última Página
                </button>
            </div>
        </div>

    )
}

export default BasicTable