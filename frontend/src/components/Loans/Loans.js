import React, { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext";
import Navbar from "../Navbar";
import ListStudents from "../Students/ListStudents";
import InputLoan from "./InputLoan";
import Library from "./Library";
import ListLoans from "./ListLoans";

const Loans = ({ students, books, loans }) => {
	const { data } = useContext(AuthContext);
	const [dataBook, setDataBook] = useState([]);
	const [dataStudent, setDataStudent] = useState([]);
	const [library, setLibrary] = useState([]);
	const [listLoans, setListLoans] = useState([]);
	const [studentsActive, setStudentsActive] = useState([]);
	const [step, setStep] = useState(1);
	const [show, setShow] = useState("");

	const getStudentById = (id) => {
		const student = students.filter((student) => student.student_id === id);
		if (student.length > 0) {
			setDataStudent(student[0]);
			setStep(2);
		}
	};
	const getBookById = (id) => {
		const book = books.filter((book) => book.book_id === id);
		if (book.length > 0) {
			setDataBook(book[0]);
			setStep(3);
		}
	};
	const inputLoan = () => {
		setStep(1);
		getLibrary();
		getStudentsActive();
		setShow("inputLoan");
	};

	const getLibrary = () => {
		const library = books.filter(
			(book) => !loans.find((loan) => loan.book_id === book.book_id)
		);
		setLibrary(library);
	};

	const getListLoans = () => {
		const listLoans = loans.map((loan) => {
			const student = students.find(
				(student) => student.student_id === loan.student_id
			);
			const book = books.find((book) => book.book_id === loan.book_id);
			return {
				...loan,
				student_name: student.student_name,
				book_name: book.book_name,
			};
		});
		setListLoans(listLoans);
	};

	const getStudentsActive = () => {
		const student = students.filter((student) => student.status === "Active");
		setStudentsActive(student);
	};

	const handleLibrary = () => {
		getLibrary();
		setShow("library");
	};

	const handleListLoans = () => {
		getListLoans();
		setShow("listLoans");
	};

	return (
		<div className="mb-8">
			<Navbar />
			<div className="px-8 pt-32">
				<h1 className="text-4xl font-bold mb-4">Loans Page</h1>
				<div className="flex space-x-7">
					{data.role === "librarian" && (
						<>
							<button
								className={`border border-blue-500 hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded mt-8" ${
									show === "library" && "bg-blue-700 text-white"
								}`}
								onClick={handleLibrary}
							>
								Library
							</button>
							<button
								className={`border border-blue-500 hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded mt-8" ${
									show === "listLoan" && "bg-blue-700 text-white"
								}`}
								onClick={handleListLoans}
							>
								List Loan
							</button>
						</>
					)}
					<button
						className={`border border-blue-500 hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded mt-8" ${
							show === "inputLoan" && "bg-blue-700 text-white"
						}`}
						onClick={inputLoan}
					>
						Input Loan
					</button>
				</div>
			</div>

			<div className="min-h-screen flex flex-col space-y-6 items-center px-8 my-6 overflow-x-auto">
				{show === "library" && (
					<Library showLoans={false} libraries={library} />
				)}
				{show === "listLoans" && <ListLoans loans={listLoans} />}
				{show === "inputLoan" && (
					<>
						{step === 1 && (
							<ListStudents
								showLoans={true}
								hidden={true}
								students={studentsActive}
								getStudentById={getStudentById}
							/>
						)}
						{step === 2 && (
							<Library
								showLoans={true}
								libraries={library}
								getBookById={getBookById}
							/>
						)}
						{step === 3 && (
							<InputLoan dataBook={dataBook} dataStudent={dataStudent} />
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Loans;
