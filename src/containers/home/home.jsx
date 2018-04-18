import React from 'react';
import {Card} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

import '../../assets/css/containers/home/home.css';


class Home extends React.Component {


  render() {


    return (
      <div className="home">
        <div className="container">
          <Card>
            <div className="home-actions">
              <div className="row">
                <div className="col-6 col-6-sm">
                  <TextField
                    hintText="10"
                    type="number"
                    className="home-actions-limit"
                  />
                </div>
                <div className="col-6 col-6-sm">
                  <IconButton className="home-actions-copy">
                    <span>&#9773;</span>
                  </IconButton>
                </div>
              </div>
            </div>
            <Divider />

            <div className="home-phrase">
              <Paper className="phrase-paper" zDepth={3}>
                <textarea name="" className="phrase-textarea" id="">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia veniam consequatur cumque voluptatem, minus. Illum ea culpa iste, sapiente expedita consectetur? Ab reiciendis, aliquid debitis inventore repellat, eos repellendus voluptate, optio quo delectus voluptas minus magnam tempora aut ipsam fugit!
                </textarea>
              </Paper>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default Home;