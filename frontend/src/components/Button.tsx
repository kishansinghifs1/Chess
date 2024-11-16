// import { Children } from "react"

export const Button = ({ onClick , children }: { onClick: () => void , children: React.ReactNode }) =>

    {
    
    return <button onClick={onClick} className="px-8 py-4 text-2xl bg-slate-700
    
    hover:bg-slate-900 text-white font-bold rounded">
    
     {children}
     </button>
    }