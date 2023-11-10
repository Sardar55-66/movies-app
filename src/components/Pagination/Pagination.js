import React from 'react';
import { Pagination } from 'antd';
import './Pagination.css'





const Pag = (props) => {

  return <div className="pag">
  <Pagination onChange={props.page} total={100}/>;
  </div>
};
export default Pag;