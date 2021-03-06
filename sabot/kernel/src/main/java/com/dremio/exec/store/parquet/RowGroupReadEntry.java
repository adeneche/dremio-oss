/*
 * Copyright (C) 2017 Dremio Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.dremio.exec.store.parquet;

import com.dremio.exec.store.dfs.ReadEntryFromHDFS;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class RowGroupReadEntry extends ReadEntryFromHDFS {

  private int rowGroupIndex;

  @JsonCreator
  public RowGroupReadEntry(@JsonProperty("path") String path, @JsonProperty("start") long start,
                           @JsonProperty("length") long length, @JsonProperty("rowGroupIndex") int rowGroupIndex) {
    super(path, start, length);
    this.rowGroupIndex = rowGroupIndex;
  }

  @JsonIgnore
  public RowGroupReadEntry getRowGroupReadEntry() {
    return new RowGroupReadEntry(this.getPath(), this.getStart(), this.getLength(), this.rowGroupIndex);
  }

  public int getRowGroupIndex(){
    return rowGroupIndex;
  }
}