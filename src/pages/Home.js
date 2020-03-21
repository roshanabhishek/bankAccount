import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';

import { withStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
  Button,
} from '@material-ui/core';

const styles = (theme) => {
  return {
    root: {
      // width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  };
};


const columns = [
  // {
  //   name: 'Account No',
  //   options: {
  //     sort: true,
  //     filter: true,
  //     filterType: 'text',
  //   },
  // },
  {
    name: 'Date',
    options: {
      sort: true,
      filter: false,
    },
  }, {
    name: 'Transaction Details',
    label: 'Description',
    options: {
      sort: true,
      filter: false,
    },
  }, {
    name: 'Value Date',
    options: {
      sort: true,
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

const convertStringToNumber = function(value) {
  if (value === '') {
    return undefined;
  };
  return parseFloat(value.replace(/,/g, ''));
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      error: '',
      isLoaded: false,
    };
  }

  fetchData = () => {
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

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const options = {
      filterType: 'dropdown',
      selectableRows: 'none',
      print: false,
      customSort: (data, colIndex, order) => {
        return data.sort((a, b) => {
         if (colIndex === 0 || colIndex === 2) {
            return (new Date(a.data[colIndex]) < new Date(b.data[colIndex]) ? -1: 1 ) * (order === 'desc' ? 1 : -1);
          } else if (colIndex === 3 || colIndex === 4 || colIndex === 5) {
            const a1 = convertStringToNumber(a.data[colIndex]);
            const a2 = convertStringToNumber(b.data[colIndex]);
            const careabout = order === 'desc' ? a1 : a2;
            return ((a1 < a2) || (careabout === undefined) ? -1: 1 ) * (order === 'desc' ? 1 : -1);
          } else { 
            return (a.data[colIndex] < b.data[colIndex] ? -1: 1 ) * (order === 'desc' ? 1 : -1); 
          }
         });
       }
      }
  
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />

        <MUIDataTable
          title={`Transaction List - Account No ${this.state.list[0] && this.state.list[0]['Account No']}`}
          data={this.state.list}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}


export default withStyles(styles)(Home);
