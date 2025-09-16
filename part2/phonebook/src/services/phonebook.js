import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
	return axios.get(baseUrl);
};

const create = (contact) => {
	return axios.post(baseUrl, contact);
};

const update = (id, contact) => {
	return axios.put(`${baseUrl}/${id}`, contact);
};

const deleteContact = (id) => {
	return axios.delete(`${baseUrl}/${id}`);
};

export default {
	getAll,
	create,
	update,
	deleteContact,
};
