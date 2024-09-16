import React from "react"
import './container-main.css'

export const ContainerMain = ({ children }: React.PropsWithChildren) => {
    return (
        <section className="container-main">
            <div className="container-main-cn">
                {children}
            </div>
        </section>
    )
}