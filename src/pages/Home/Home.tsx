import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Home.css";
import {
  useDeleteContactMutation,
  useGetContactsQuery,
} from "../../services/contactsApi";
import { useEffect } from "react";

const Home = () => {
  const { data, error, isSuccess, isLoading } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();
  useEffect(() => {
    if (error) {
      toast.error("Something went wrong");
    }
  }, [error]);
  const handleDelete = async (id: any) => {
    if (window.confirm("Are you sure that you wanted to delete that user ?")) {
      deleteContact(id);
      toast.success("Contact Deleted Successfully");
    }
  };
  return (
    <div className="home">
      <div className="home_top">
        <h2>Redux Toolkit RTK Query CRUD with React and JSON Server </h2>
      </div>
      {isLoading && <h1 className="loading">...Loading</h1>}
      {isSuccess && (
        <div>
          <div className="add_contact">
            <Link to="/add">
              <button className="btn btn-add">Add Contact</button>
            </Link>
          </div>
          <table className="styled-table">
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item: any, index: any) => {
                  return (
                    <tr key={item.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.contact}</td>
                      <td>
                        <Link to={`/update/${item.id}`}>
                          <button className="btn btn-edit">Edit</button>
                        </Link>
                        <button
                          className="btn btn-delete"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                        <Link to={`/view/${item.id}`}>
                          <button className="btn btn-view">View</button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
