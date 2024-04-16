import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByGender = props => {
  const {vaccinationByGenderList} = props
  console.log(vaccinationByGenderList)
  const colors = ['#f54394', '#5a8dee', '#2cc6c6']
  return (
    <PieChart height={300} width={1000}>
      <Pie
        cx="70%"
        cy="40%"
        data={vaccinationByGenderList}
        startAngle={0}
        endAngle={180}
        innerRadius="40%"
        outerRadius="70%"
        dataKey="count"
      >
        {vaccinationByGenderList.map((eachGender, index) => (
          <Cell
            key={eachGender.index}
            name={eachGender.gender}
            fill={colors[index]}
          />
        ))}
      </Pie>
      <Legend
        iconType="circle"
        layout="horizontal"
        verticalAlign="bottom"
        align="center"
      />
    </PieChart>
  )
}
export default VaccinationByGender
