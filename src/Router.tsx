import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CartPage } from './pages/CartPage'
import { FulfillmentPage } from './pages/FulfillmentPage'
import { InventoryPage } from './pages/InventoryPage'
import { LoginPage } from './pages/LoginPage'
import { OrdersPage } from './pages/OrdersPage'

export const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact component={LoginPage} />
                <Route path="/inventory" exact component={InventoryPage} />
                <Route path="/cart" exact component={CartPage} />
                <Route path="/orders" exact component={OrdersPage} />
                <Route path="/orders" exact component={OrdersPage} />
                <Route path="/fulfillment" exact component={FulfillmentPage} />

                <Route path="/" component={LoginPage} />
            </Switch>
        </BrowserRouter>
    )
}
