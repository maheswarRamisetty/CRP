import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home';
import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';
import ImageAnalysisEnhanced from '../pages/ImageAnalysisEnhanced';
import PredictionPageEnhanced from '../pages/PredictionPageEnhanced';
import ImageAnalysis from '../pages/ImageAnalysis';
import FoodRecommendations from '../pages/FoodRecommendations';
import PatientStories from '../pages/PatientStories';
import Learning from '../pages/Learning';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/image-page" element={
        <ProtectedRoute>
          <ImageAnalysisEnhanced />
        </ProtectedRoute>
      } />
      <Route path="/prediction-page" element={
        <ProtectedRoute>
          <PredictionPageEnhanced />
        </ProtectedRoute>
      } />
      <Route path="/analysis" element={
        <ProtectedRoute>
          <ImageAnalysis />
        </ProtectedRoute>
      } />
      <Route path="/food-recommendations" element={
        <ProtectedRoute>
          <FoodRecommendations />
        </ProtectedRoute>
      } />
      {/* <Route path="/stories" element={
        <ProtectedRoute>
          <PatientStories />
        </ProtectedRoute>
      } /> */}
      <Route path="/learning" element={
        <ProtectedRoute>
          <Learning />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default AppRoutes;