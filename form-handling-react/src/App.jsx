import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/FormikForm';

function App() {
  return (
    <div>
      <h1>Controlled Component Form (Separate State)</h1>
      <RegistrationForm />
      <hr />
      <h1>Formik Form</h1>
      <FormikForm />
    </div>
  );
}

export default App;