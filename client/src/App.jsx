import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Goals from "./pages/Goals";
import GoalDetails from "./pages/GoalDetails";
import SkillGaps from "./pages/SkillGaps";
import CreateUser from "./pages/CreateUser";


function App() {

    return (
        <BrowserRouter>

            <Routes>
                   <Route path="/" element={<Home />} />
                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />
                <Route path="/goals" element={<Goals />} />
                <Route
    path="/goals/:goalId"
    element={<GoalDetails />}
/>
           <Route
    path="/goals/:goalId/skill-gaps"
    element={<SkillGaps />}
/>
    <Route
    path="/onboarding"
    element={<CreateUser />}
/>
            </Routes>
          

        </BrowserRouter>
        
    );
}

export default App;