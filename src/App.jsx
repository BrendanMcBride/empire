import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Layout } from "./Layout";
import { Home } from "./Pages/Home";
import { Room } from "./Pages/Room";
import { RoomList } from "./Pages/RoomList";
import { AddName } from "./Pages/AddName";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 0,
    },
  },
})

export const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="addname/:id" element={<AddName />} />
          <Route path="room/:id" element={<Room />} />
          <Route path="roomlist/:id" element={<RoomList />} />
          <Route path='*' exact={true} element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
    {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )

}

export default App