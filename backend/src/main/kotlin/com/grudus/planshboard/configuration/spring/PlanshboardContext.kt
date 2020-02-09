package com.grudus.planshboard.configuration.spring

import com.grudus.planshboard.commons.CurrentTimeProvider
import com.grudus.planshboard.commons.SystemCurrentTimeProvider
import com.grudus.planshboard.env.EnvironmentKeys.FRONTEND_ADDRESS
import com.grudus.planshboard.env.EnvironmentKeys.SPRING_DATASOURCE_DRIVER_CLASS_NAME
import com.grudus.planshboard.env.EnvironmentKeys.SPRING_DATASOURCE_PASSWORD
import com.grudus.planshboard.env.EnvironmentKeys.SPRING_DATASOURCE_URL
import com.grudus.planshboard.env.EnvironmentKeys.SPRING_DATASOURCE_USERNAME
import com.grudus.planshboard.env.EnvironmentService
import org.jooq.ConnectionProvider
import org.jooq.SQLDialect
import org.jooq.impl.DataSourceConnectionProvider
import org.jooq.impl.DefaultDSLContext
import org.springframework.boot.jdbc.DataSourceBuilder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.jdbc.datasource.DataSourceTransactionManager
import org.springframework.jdbc.datasource.TransactionAwareDataSourceProxy
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.transaction.annotation.EnableTransactionManagement
import java.time.LocalDateTime
import javax.sql.DataSource

@Configuration
@EnableTransactionManagement
@EnableGlobalMethodSecurity(prePostEnabled = true)
class PlanshboardContext {

    @Bean
    fun primaryDataSource(
        env: EnvironmentService
    ): DataSource =
        DataSourceBuilder.create()
            .url(env.getText(SPRING_DATASOURCE_URL))
            .username(env.getText(SPRING_DATASOURCE_USERNAME))
            .password(env.getText(SPRING_DATASOURCE_PASSWORD))
            .driverClassName(env.getText(SPRING_DATASOURCE_DRIVER_CLASS_NAME))
            .build()

    @Bean
    fun transactionManager(dataSource: DataSource): DataSourceTransactionManager =
        DataSourceTransactionManager(dataSource)

    @Bean
    fun connectionProvider(dataSource: DataSource): DataSourceConnectionProvider =
        DataSourceConnectionProvider(TransactionAwareDataSourceProxy(dataSource) as DataSource?)

    @Bean
    fun dsl(connectionProvider: ConnectionProvider): DefaultDSLContext =
        DefaultDSLContext(connectionProvider, SQLDialect.POSTGRES)

    @Bean
    fun passwordEncoder(): PasswordEncoder =
        BCryptPasswordEncoder(12)

    @Bean
    fun allowedOrigins(env: EnvironmentService): List<String> =
        env.getList(FRONTEND_ADDRESS)

    @Bean
    fun currentTimeProvider(): CurrentTimeProvider = SystemCurrentTimeProvider()
}
