import { ConnectButton } from "@rainbow-me/rainbowkit";

import React from 'react'

const Header = () => {
    return (
        <div className="flex justify-between items-centerp-5">
            <div className="grow">Logo</div>
            <ConnectButton />
        </div>
    )
}

export default Header