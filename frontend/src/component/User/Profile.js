import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>MY PROFILE</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/me/update">EDIT PROFILE</Link>
            </div>
            <div>
              <div>
                <h4>FULL NAME</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>EMAIL</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>JOINED ON</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">VIEW ORDERS</Link>
                <Link to="/password/update">CHANGE PASSWORD</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
