import React from 'react'
import { View, SectionList, Text, Dimensions } from 'react-native'
import styled from 'styled-components/native'

import styles from './Styles/WorkshopsStyle'
import WorkshopTile from '../Components/WorkshopTile'
import { Colors } from '../Themes'

const Separator = styled.View`
  height: 1px;
  background-color: ${Colors.grey};
`

class Workshops extends React.PureComponent {
  renderItem = ({section, item}) => {
    return (
      <WorkshopTile
        section={section}
        item={item}
        onPress={() => {
          this.props.onSessionSelected(item)
        }}
      />
    )
  }

  renderSectionHeader ({section}) {
    const title = `${section.begin} - ${section.end}`
    const { width } = Dimensions.get('window')
    return (
      <View style={[{width}, styles.sectionHeader]}>
        <Text style={styles.boldLabel}>{title}</Text>
      </View>
    )
  }

  renderEmpty = () => <Text style={styles.label} />

  keyExtractor = (item, index) => index

  oneScreensWorth = 20

  render () {
    const data = this.props.workshops.map(item => ({
      ...item,
      data: item.sessions
    }))

    return (
      <View style={styles.container}>
        <SectionList
          renderSectionHeader={this.renderSectionHeader}
          sections={data}
          ItemSeparatorComponent={() => <Separator />}
          contentContainerStyle={styles.listContent}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListEmptyComponent={this.renderEmpty}
          />
      </View>
    )
  }
}

export default Workshops
