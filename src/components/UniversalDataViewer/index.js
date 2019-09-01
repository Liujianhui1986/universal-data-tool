// @flow

import React, { useMemo } from "react"
import TextClassification from "../TextClassification"
import TextEntityRecognition from "../TextEntityRecognition"
import DataEntry from "../DataEntry"
import EmptySampleContainer from "../EmptySampleContainer"
import BadOHA from "../BadOHA"

export const UniversalDataViewer = ({
  oha,
  hideHeader,
  hideDescription,
  datasetName,
  requireCompleteToPressNext,
  onSaveTaskOutputItem
}) => {
  // TODO type check w/ superstruct against oha
  const containerProps = useMemo(
    () => ({
      hideHeader,
      hideDescription,
      datasetName,
      requireCompleteToPressNext
    }),
    [hideHeader, hideDescription, requireCompleteToPressNext, datasetName]
  )

  if (!oha) {
    return (
      <BadOHA
        title="Null OHA"
        description="Your OHA file isn't defined for some reason."
      />
    )
  }

  if (!oha.taskData || oha.taskData.length === 0) {
    return <EmptySampleContainer />
  }

  switch (oha.interface.type) {
    case "data_entry":
      return (
        <DataEntry
          containerProps={containerProps}
          {...oha}
          onSaveTaskOutputItem={onSaveTaskOutputItem}
        />
      )
    case "text_classification":
      return (
        <TextClassification
          containerProps={containerProps}
          {...oha}
          onSaveTaskOutputItem={onSaveTaskOutputItem}
        />
      )
    case "text_entity_recognition":
      return (
        <TextEntityRecognition
          containerProps={containerProps}
          {...oha}
          onSaveTaskOutputItem={onSaveTaskOutputItem}
        />
      )
    default:
      return `"${oha.interface.type}" not supported`
  }
}

export default UniversalDataViewer
