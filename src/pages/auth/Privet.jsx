
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

function Privet() {
  const authUser = useSelector((state) => state.auth);
  console.log(authUser);

  // যদি লগইন করা না থাকে
  if (!authUser.isLogin) {
    return <Navigate to={'/signin'} />;
  }

  // রোল অনুযায়ী পেজ রেন্ডার করা
  if (authUser.user?.role === 'admin') {
    return (
  <h2>you are admin</h2>
    );
  } else if (authUser.user?.role === 'moderator') {
    return (
      <div>
        <h1>Moderator Dashboard</h1>
        <p>Welcome, {authUser.user.firstName} (Moderator)</p>
      </div>
    );
  } else if (authUser.user?.role === 'user') {
    return (
      <div>
        <h1>User Profile</h1>
        <p>Welcome, {authUser.user.firstName} (User)</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Unauthorized Access</h1>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }
}

export default Privet;
