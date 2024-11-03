import React from "react";
import { assignAppointment , filterByColaborator} from "../../../../redux/actions";
import { useDispatch } from "react-redux";

const AssignAppointment = ({id}) => {
  const dispatch = useDispatch();

  const colaboratorSelection = (event) => {
    const selectedCollaborator = event.target.value;
    dispatch(assignAppointment(selectedCollaborator, id));
  };
  return (
    <>
      <select onChange={colaboratorSelection}>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
        <option value="F">F</option>
        <option value="G">G</option>
        <option value="H">H</option>
        <option value="I">I</option>
        <option value="J">J</option>
      </select>
    </>
  );
};

export default AssignAppointment;
