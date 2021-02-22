import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function MergeSort() {
  // Declare a new state variable, which we'll call "count"
  const [mode, setMode] = useState('Start')
  const [columns, setColumns] = useState([
    { index: 0, value: 23 },
    { index: 1, value: 12 },
    { index: 2, value: 14 },
    { index: 3, value: 19 },
    { index: 4, value: 20 },
    { index: 5, value: 11 },
    { index: 6, value: 13 },
    { index: 7, value: 18 },
    { index: 8, value: 27 }
  ]);
  const [arrayView, setView] = useState('[23,12,14,19,20,11,13,18,27]')

  function arrayParse(str) {
    str = str.slice(1, str.length - 1);
    return str.split(',');
  }

  function setData(str) {
    let arr = arrayParse(str);
    let columnsModel = []
    for (let i = 0; i < arr.length; i++) {
      columnsModel.push({ index: i, value: Number(arr[i]) });
    }
    setColumns([...columnsModel]);
  }

  function onSubmit(e) {
    e.preventDefault();
    setData(e.target.columns.value)
  }

  function onChange(e) {
    setView(e.target.value);
  }


  return (
    <div>
      <h2 className="text-center">Merge Sort</h2>
      <button onClick={() => mode === 'Start' ? setMode('Stop') : setMode('Start')}>
        {mode}
      </button>
      <br />
      <form onSubmit={onSubmit}>
        <label htmlFor="columns">Use your own array!</label>
        <br />
        <input type="text" id="columns" name="columns" value={arrayView} onChange={onChange}></input>
        <input type="submit" value="use my array"></input>
      </form>
      <div className="sticky-top">
        <div className="position-absolute mt-5 end-0">
          <div className="code-block">
            <div className="code-block-content">
              <MergeCodeBlock />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <MergeSortColumns mode={mode} columns={columns} />
      </div>
    </div>
  );
}

function MergeSortColumns(props) {
  let { columns } = props;
  console.log(columns);
  let steps = [];
  const mergeSort = arr => {
    let arrCopy = arr.slice();
    let arrView = arr.slice();
    if (arrCopy.length < 2) {
      return arrCopy;
    }
    const arrViewLeft = arrView.splice(0, arrView.length / 2);
    const arrViewRight = arrView;
    steps.push([...arrViewLeft], 'left')
    const arrLeft = mergeSort(arrCopy.splice(0, arrCopy.length / 2));
    steps.push([...arrViewRight], 'right')
    const arrRight = mergeSort(arrCopy);
    let mergedArr = [];
    while (arrLeft.length && arrRight.length) {
      if (arrLeft[0].value < arrRight[0].value) {
        mergedArr.push(arrLeft.shift());
      } else {
        mergedArr.push(arrRight.shift());
      }
    }
    steps.push([...mergedArr, ...arrLeft, ...arrRight], 'merged')
    return [...mergedArr, ...arrLeft, ...arrRight];
  };
  mergeSort(columns)
  return (
    <div>
      <div className="row">
        <div className="col-1">
          start
        </div>
        {columns.map(elem =>
          <div className="col-1" key={elem.index}>
            {elem.value}
          </div>
        )}
      </div>
      <MergeSortSteps steps={steps} mode={props.mode} />
    </div>
  )
}

function MergeSortSteps(props) {
  const { steps } = props;
  console.log(steps);
  let stepsModel = [];
  let step;
  let type;
  let formattedStep;
  let iterator = 0;
  for (let i = 0; i < steps.length; i += 2) {
    step = [];
    type = '';
    if (steps[i + 1] === 'left') {
      type = 'left';
      for (let j = 0; j < steps[i].length; j++) {
        step.push(<div className='left text-success' id={steps[i][j].index}> {steps[i][j].value} </div>
        )
      }
    } else if (steps[i + 1] === 'right') {
      type = 'right';
      for (let j = 0; j < steps[i].length; j++) {
        step.push(<div className='right text-danger' id={steps[i][j].index}> {steps[i][j].value} </div>
        )
      }
    } else {
      type = 'merged'
      for (let j = 0; j < steps[i].length; j++) {
        step.push(<div className='merged text-info' id={steps[i][j].index}> {steps[i][j].value} </div>
        )
      }
    }
    stepsModel.push({
      type,
      step
    });
  }
  if (props.mode === 'Stop') {
    return (
      <div>
        {stepsModel.map((elem, index) =>
          <div className="row justify-content-start top-buffer" key={index}>
            <div className="col-1">
              {elem.type}
            </div>
            {elem.step.map((val, index) =>
              <div className="col-1" key={index}>
                {val}
              </div>
            )}
          </div>
        )}
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
};

function MergeCodeBlock(props) {
  return (
    <h6>
      <span className="const">const</span><span className="function"> mergeSort</span> = <span className="variable-name"> arr </span> <span className="const">=></span> {"{"}
      <br />
      &nbsp;&nbsp;<span className="logic">{"if "}</span>(<span className="variable-name">arr</span>.<span className="variable-name">length</span> {"<"} <span className="numbers">2</span>){" {"} <span className="logic">return</span><span className="variable-name"> arr</span>; {"}"}
      <br />
      &nbsp;&nbsp;<span className="const">const</span> <span className="const-name">arrLeft</span> = <span className="function"> mergeSort</span>(<span className="variable-name">arr</span>.<span className="function">splice</span>(<span className="numbers">0</span>, <span className="variable-name"> arr</span>.<span className="variable-name">length</span> / <span className="numbers">2</span>));
      <br />
      &nbsp;&nbsp;<span className="const">const</span> <span className="const-name">arrRight</span> = <span className="function"> mergeSort</span>(<span className="variable-name">arr</span>);
      <br />
      &nbsp;&nbsp;<span className="const">let</span> <span className="variable-name">mergedArr</span> = [];
      <br />
      &nbsp;&nbsp;<span className="logic">while </span>(<span className="const-name">arrLeft</span>.<span className="variable-name">length</span> {"&&"} <span className="const-name">arrRight</span>.<span className="variable-name">length</span>) {"{"}
      <br />
      &nbsp;&nbsp;&nbsp;&nbsp;{"if"} (<span className="const-name">arrLeft</span>[<span className="numbers">0</span>] {"<"} <span className="const-name">arrRight</span>[<span className="numbers">0</span>] {"{"}
      <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="variable-name">mergedArr</span>.<span className="function">push</span>(<span className="const-name">arrLeft</span>.<span className="function">shift</span>());
        <br />
      &nbsp;&nbsp;&nbsp;&nbsp;{"}"} <span className="logic">else</span> {"{"}
      <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="variable-name">mergedArr</span>.<span className="function">push</span>(<span className="const-name">arrRight</span>.<span className="function">shift</span>());
        <br />
      &nbsp;&nbsp;&nbsp;&nbsp;{"}"}
      <br />
      &nbsp;&nbsp;{"}"}
      <br />
      &nbsp;&nbsp;<span className="logic">return</span> [...<span className="variable-name">mergedArr</span>, ...<span className="const-name">arrLeft</span>, ...<span className="const-name">arrRight</span>];
      <br />
      {"}"};
    </h6>
  )
}

export default MergeSort;