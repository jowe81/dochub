import React, {useState} from 'react';
import axios from 'axios';

function Upload(){
	const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const handleSubmission = () => {
    const formData = new FormData();
		formData.append('file', selectedFile);
    axios({
      method: "post",
      url: "/api/documents",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(res => {
      console.log(res);
    });
	};

	return(
   <div>
			<input type="file" name="file" onChange={changeHandler} />
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
		</div>
	)
}

export default Upload;