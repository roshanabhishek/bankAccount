import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';

import { withStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
  Button,
} from '@material-ui/core';
import ActionCreators from '../actions';

const styles = (theme) => {
  return {
    root: {
      // width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  };
};


const columns = [
  {
    name: 'Account No',
    options: {
      sort: true,
      filter: true,
      filterType: 'text',
    },
  },
  {
    name: 'Date',
    options: {
      sort: true,
      filter: false,
    },
  }, {
    name: 'Transaction Details',
    options: {
      sort: false,
      filter: false,
    },
  }, {
    name: 'Value Date',
    options: {
      sort: false,
      filter: false,
    },
  }, {
    name: 'Withdrawal AMT',
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'Deposit AMT',
    options: {
      filter: false,
      sort: true,
    },
  }, {
    name: 'Balance AMT',
    options: {
      filter: false,
      sort: true,
    },
  },
];

const options = {
  filterType: 'dropdown',
  selectableRows: 'none',
  print: false,
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      error: '',
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch("http://starlord.hackerearth.com/bankAccount")
      .then(res => res.json())
      .then(
        (result) => {
          console.log('RESULT', result);
          this.setState({
            isLoaded: true,
            list: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />

        <MUIDataTable
          title="Transaction List"
          data={this.state.list}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
  };
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Home));
