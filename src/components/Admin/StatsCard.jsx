
import React from 'react';
/**
 * StatsCard – displays a single metric with gradient background & icon.
 * @param {{title:string,value:number,icon:JSX.Element,color:string,trend?:number}} props 
 */
export default function StatsCard({ title, value, icon, color='from-blue-500 to-blue-700', trend }) {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-lg p-5 shadow hover:shadow-lg transition-all hover:-translate-y-0.5`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-200">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {trend !== undefined && (
            <p className={`text-xs mt-1 ${trend >= 0 ? 'text-green-200' : 'text-red-200'}`}>
              {trend >=0 ? '▲' : '▼'} {Math.abs(trend)}% this month
            </p>
          )}
        </div>
        <div className="text-4xl opacity-90 text-white">{icon}</div>
      </div>
    </div>
  )
}
