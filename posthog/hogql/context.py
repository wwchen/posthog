from dataclasses import dataclass, field
from typing import Dict, List, Literal, Optional


@dataclass
class HogQLFieldAccess:
    input: List[str]
    type: Optional[Literal["event", "event.properties", "person", "person.properties"]]
    field: Optional[str]
    sql: str


@dataclass
class HogQLContext:
    """Context given to a HogQL expression printer"""

    # If set, will save string constants to this dict. Inlines strings into the query if None.
    values: Dict = field(default_factory=dict)
    # Are we small part of a non-HogQL query? If so, use custom syntax for accessed person properties.
    within_non_hogql_query: bool = False
    # Do we need to join the persons table or not. Has effect if within_non_hogql_query = True
    using_person_on_events: bool = True
    # If set, allows printing full SELECT queries in ClickHouse
    select_team_id: Optional[int] = None
    # Do we apply a limit of MAX_SELECT_RETURNED_ROWS=65535 to the topmost select query?
    limit_top_select: bool = True
    # To be removed. Did the last calls to translate_hogql since setting this to False contain an aggregation?
    found_aggregation: bool = False
