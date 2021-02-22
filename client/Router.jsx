import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import BucketSort from './src/BucketSort'
import CountingSort from './src/CountingSort'
import HeapSort from './src/HeapSort'
import Home from './src/Home'
import MergeSort from './src/MergeSort'
import QuickSort from './src/QuickSort'

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/merge-sort">Merge Sort</Link>
            </li>
            <li>
              <Link to="/quick-sort">Quick Sort</Link>
            </li>
            <li>
              <Link to="/bucket-sort">Bucket Sort</Link>
            </li>
            <li>
              <Link to="/heap-sort">Heap Sort</Link>
            </li>
            <li>
              <Link to="/counting-sort">Counting Sort</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/merge-sort">
            <MergeSort />
          </Route>
          <Route path="/quick-sort">
            <QuickSort />
          </Route>
          <Route path="/bucket-sort">
            <BucketSort />
          </Route>
          <Route path="/heap-sort">
            <HeapSort />
          </Route>
          <Route path="/counting-sort">
            <CountingSort />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;