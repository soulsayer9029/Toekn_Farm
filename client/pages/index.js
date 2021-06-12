import React from 'react'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.css'

const home=() =>
<div>
  <h1>Home</h1>
  <p className="text-danger">Note that Web3 is not loaded for this page.</p>
  <div><Link href='/dapp'><a>My Dapp</a></Link></div>
  <div><Link href='/accounts'><a>My Accounts</a></Link></div>
</div>
export default home;
