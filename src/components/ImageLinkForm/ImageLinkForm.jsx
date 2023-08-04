import './ImageLinkForm.css'


const ImageLinkForm = ({ onInputChange, onSubmit}) => {

    return (
        <div>
            <p className='f3 center' >
            {'This Tool will detect faces in your image. Just Paste a Link :)'}
            </p>
            <div className="center" >
            <div className="form center pa4 br3 shadow-1" >
                <input className='f4 pa2 center w-70 bn' type='text' 
                onChange={onInputChange}
                />
                <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple bn b--white" 
                onClick={onSubmit}
                >
                Detect!</button>
            </div>
            </div>
        </div>
    )


};



export default ImageLinkForm;