import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router';

import {UserProvider} from './contexts/UserContext';

import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Register from './views/Register';

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <UserProvider>
        <Routes>

          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App;

/*
const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <UserProvider>
          <LanguageProvider>

          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />

              <Route path="/contacts" element={<Contacts />} />
              <Route path="/weeklist" element={<Weeklist />} />
              <Route path="/giftcards" element={<Giftcards />} />


              {/* Login required routes below! *//*}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    {' '}
                    <Profile />{' '}
                  </ProtectedRoute>
                }
              />

                <Route
                path="/shoppingcart"
                element={
                  <ProtectedRoute>
                    {' '}
                    <ShoppingCart />{' '}
                  </ProtectedRoute>
                }
              />
            </Route>

            

            {/* Admin routes - TODO: protect the routes *//*}
            {/* example path: /admin/addmeal *//*}
            <Route path="/admin" element={<ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="meals" element={<Meals />} />
              <Route path="addmeal" element={<AddMeal />} />

              <Route path="menus" element={<Menus />} />
              <Route path="addmenus" element={<AddMenu />} />
              <Route path="orders" element={<Orders />} />
              <Route path="giftcards" element={<GiftcardsAdmin />} />
              <Route path="reservations" element={<ReservationsAdmin />} />
              <Route path="discounts" element={<DiscountsAdmin />} />
              <Route path="users" element={<UsersAdminView />} />
            </Route>
          </Routes>

          </LanguageProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
*/
