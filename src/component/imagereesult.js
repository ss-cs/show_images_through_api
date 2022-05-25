import React,{ useState} from 'react';
import PropTypes from 'prop-types';
import {GridList,GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

// class ImageResults extends Component{
const ImageResults = (props)=>{
    let mystate={
        open:false,
        currentImg:''
    }
    const [state,updateState] = useState(mystate);
    let handleOpen=img=>{
        updateState({open:true,currentImg:img})
    }
    let handleClose=()=>{
        updateState({open:false});
    }
    
    
        let imageList;
        const {images}=props

        if(images)
        {
            imageList=(
                <GridList cols={4}>
                {  images.map(img=>(
                        <GridTile
                        title={img.tags}
                        key={img.id}
                        actionIcon={
                            <IconButton onClick={()=>handleOpen(img.largeImageURL)}>
                            <ZoomIn color="white" />
                            </IconButton>
                        }
                        >
                        <img src={img.largeImageURL} alt="" />
                        </GridTile>
                    ))
                }
                </GridList>
            )
        }
        else{
            imageList=null;
        }
        const actions=[
            <FlatButton  label="Close" primary={true} onClick={handleClose}/>
        ]
        return(
            <div style={{marginLeft:50,marginRight:50,marginTop:20}}>
            {imageList}
            <Dialog
            actions={actions}
            modal={false}
            open={state.open}
            onRequestClose={handleClose}
            >
            <img src={state.currentImg} alt="" style={{width:'100%'}} />
            </Dialog>
            </div>
        )
    
}
ImageResults.propTypes={
    images:PropTypes.array.isRequired
}

export default ImageResults;