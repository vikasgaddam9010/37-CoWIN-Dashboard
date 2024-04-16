import './index.css'
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByAge = props => {
  const {vaccinationByAgeList} = props
  console.log(vaccinationByAgeList)
  const colors = ['#f54394', '#5a8dee', '#2cc6c6']
  const colorsForAgePieChart = ['#2d87bb', '#a3df9f', '#64c2a6']
  return (
    <div>
      <ResponsiveContainer height={300} width={1000}>
        <PieChart>
          <Pie
            cx="70%"
            cy="30%"
            outerRadius="60%"
            data={vaccinationByAgeList}
            dataKey="count"
          >
            {vaccinationByAgeList.map((eachGender, index) => (
              <Cell
                key={eachGender.index}
                name={eachGender.age}
                fill={colorsForAgePieChart[index]}
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
      </ResponsiveContainer>
    </div>
  )
}
export default VaccinationByAge
