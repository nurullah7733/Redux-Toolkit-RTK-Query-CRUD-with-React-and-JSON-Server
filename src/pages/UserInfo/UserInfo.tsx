import { useGetContactQuery } from "../../services/contactsApi";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./UserInfo.css";
import { useEffect } from "react";

const UserInfo = () => {
  const { id } = useParams();

  const { data, error, isSuccess, isLoading } = useGetContactQuery(id!);
  useEffect(() => {
    if (error) {
      toast.error("Contact Details Error");
    }
  });
  return (
    <div style={{ marginTop: "150px", textAlign: "center" }}>
      <div className="card">
        <div className="card-header">
          <p>User Contact Detail</p>
        </div>
        {/* @ts-ignore */}

        {isLoading && <h1>...Loading</h1>}
        {isSuccess && (
          <div className="container">
            <strong>ID: </strong>
            <span>{data?.id}</span>
            <br />
            <br />

            <strong>Name: </strong>
            <span>{data?.name}</span>
            <br />
            <br />
            <strong>Email: </strong>
            <span>{data?.email}</span>
            <br />
            <br />
            <strong>Contact: </strong>
            <span>{data?.contact}</span>
            <br />
            <br />
          </div>
        )}
        <Link to="/">
          <button className="btn btn-edit">Go Back</button>
        </Link>
      </div>
    </div>
  );
};

export default UserInfo;
