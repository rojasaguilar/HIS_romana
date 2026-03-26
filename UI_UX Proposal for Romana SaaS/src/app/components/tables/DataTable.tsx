import React, { useState } from 'react';
import { Search, Filter, ChevronDown, MoreVertical } from 'lucide-react';

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  onRowClick?: (item: T) => void;
  actions?: (item: T) => React.ReactNode;
  emptyMessage?: string;
}

export function DataTable<T extends { id: string }>({ 
  data, 
  columns, 
  searchPlaceholder = 'Buscar...',
  onRowClick,
  actions,
  emptyMessage = 'No hay datos disponibles'
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredData = data.filter(item => {
    if (!searchTerm) return true;
    return Object.values(item).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      {/* Table Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-secondary border border-transparent rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Filter Button */}
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
          >
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filtros</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Filters Dropdown */}
        {showFilters && (
          <div className="mt-3 p-4 bg-secondary rounded-lg">
            <p className="text-sm text-muted-foreground">
              Filtros avanzados (próximamente)
            </p>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              {columns.map((column, index) => (
                <th 
                  key={index}
                  className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
              {actions && (
                <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Acciones
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredData.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length + (actions ? 1 : 0)} 
                  className="px-6 py-12 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              filteredData.map(item => (
                <tr 
                  key={item.id}
                  onClick={() => onRowClick?.(item)}
                  className={`hover:bg-secondary/50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                >
                  {columns.map((column, index) => (
                    <td key={index} className="px-6 py-4 text-sm text-foreground">
                      {column.render 
                        ? column.render(item) 
                        : String((item as any)[column.key] || '-')
                      }
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        {actions(item)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="px-6 py-3 border-t border-border bg-secondary/30">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando {filteredData.length} de {data.length} resultados
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm border border-border rounded hover:bg-white transition-colors">
              Anterior
            </button>
            <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
              1
            </button>
            <button className="px-3 py-1 text-sm border border-border rounded hover:bg-white transition-colors">
              2
            </button>
            <button className="px-3 py-1 text-sm border border-border rounded hover:bg-white transition-colors">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}